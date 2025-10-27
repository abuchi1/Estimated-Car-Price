
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { FormData, ValuationResult, GroundingSource } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const estimateCarPrice = async (formData: FormData): Promise<ValuationResult> => {
  const { brand, model, year, kms } = formData;

  const prompt = `
    Với vai trò là một chuyên gia định giá xe của một công ty bảo hiểm hàng đầu tại Việt Nam, hãy phân tích và xác định giá trị tham chiếu của chiếc xe sau đây để phục vụ cho mục đích bảo hiểm.

    Giá trị này sẽ được dùng làm cơ sở để tính phí bảo hiểm vật chất (bảo hiểm thân vỏ) và xác định số tiền bồi thường tối đa trong trường hợp xe bị tổn thất toàn bộ.

    Thông tin xe:
    - Hãng xe: ${brand}
    - Dòng xe và phiên bản: ${model}
    - Năm sản xuất: ${year}
    - Số km đã đi: ${kms} km

    Yêu cầu định giá:
    1.  **Xác định giá trị tham chiếu:** Cung cấp một khoảng giá trị hợp lý và một giá trị dự kiến cụ thể để làm cơ sở tính phí bảo hiểm. Hãy tập trung vào giá trị thực của xe dựa trên khấu hao theo thời gian, tình trạng (qua số km), và giá trị xe mới tương đương (nếu có). Bỏ qua các yếu-tố mang tính thời điểm như "độ hot" của dòng xe, nhu cầu thị trường ngắn hạn, hay khả năng bán nhanh.
    2.  **Sử dụng Google Search:** Nghiên cứu giá niêm yết của xe mới và giá trị xe đã qua sử dụng trên thị trường để có cơ sở dữ liệu khách quan.
    3.  **Phân tích các yếu tố:** Trong phần phân tích, hãy giải thích ngắn gọn các yếu tố chính được sử dụng để xác định giá trị xe cho mục đích bảo hiểm, chẳng hạn như khấu hao tiêu chuẩn, chi phí thay thế, và các yếu-tố khác liên quan đến rủi ro.
    4.  **Trình bày kết quả:** Cung cấp câu trả lời theo định dạng sau. BẮT BUỘC phải tuân thủ định dạng này, chỉ bao gồm các phần này và không thêm bất kỳ định dạng Markdown nào khác (như ### hoặc ***):
        
        KHOẢNG GIÁ: [Điền khoảng giá trị tham chiếu của bạn vào đây]
        
        GIÁ DỰ KIẾN: [Điền giá trị tham chiếu cụ thể, đây là con số quan trọng nhất cho hợp đồng bảo hiểm]

        PHÂN TÍCH: [Điền phân tích chi tiết của bạn dưới góc độ của một chuyên gia bảo hiểm.]
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });

    const text = response.text;
    
    // Use regex to parse the structured text response
    const priceRangeMatch = text.match(/KHOẢNG GIÁ:\s*(.*)/);
    const estimatedPriceMatch = text.match(/GIÁ DỰ KIẾN:\s*(.*)/);
    // Use [\s\S] to match across multiple lines for the analysis part
    const analysisMatch = text.match(/PHÂN TÍCH:\s*([\s\S]*)/);

    if (!priceRangeMatch || !analysisMatch || !estimatedPriceMatch) {
      console.error("Could not parse Gemini response:", text);
      throw new Error(`Dịch vụ AI đã trả về một định dạng không mong muốn.
Điều này đôi khi xảy ra với các yêu cầu phức tạp. Vui lòng thử lại.`);
    }
    
    const priceRange = priceRangeMatch[1].trim();
    const estimatedPrice = estimatedPriceMatch[1].trim();
    const analysis = analysisMatch[1].trim();

    const sources: GroundingSource[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      priceRange,
      estimatedPrice,
      analysis,
      sources,
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes('không mong muốn')) {
      throw error;
    }
    
    // This generic error is kept for network issues or API outages
    throw new Error(`Vui lòng kiểm tra các khả năng sau:
• Kết nối internet của bạn có ổn định không?
• Dịch vụ có thể đang tạm thời quá tải. Vui lòng thử lại sau vài phút.`);
  }
};
