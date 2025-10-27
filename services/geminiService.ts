import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { FormData, ValuationResult, GroundingSource } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const estimateCarPrice = async (formData: Omit<FormData, 'condition'>): Promise<ValuationResult> => {
  const { brand, model, year, kms } = formData;

  const prompt = `
    Với vai trò là một chuyên gia định giá xe chuyên nghiệp tại Việt Nam, hãy thực hiện một phân tích chi tiết và đưa ra ước tính giá trị cho chiếc xe sau. Phân tích của bạn phải logic, dựa trên dữ liệu và tuân thủ nghiêm ngặt định dạng đầu ra.

    **Thông tin xe:**
    - Hãng xe: ${brand}
    - Mẫu xe: ${model}
    - Năm sản xuất: ${year}
    - Số km đã đi: ${kms} km

    **QUY TRÌNH BẮT BUỘC:**

    1.  **Nghiên cứu thị trường (Sử dụng Google Search):**
        *   Tìm giá niêm yết của một chiếc xe **${brand} ${model}** mới tương đương (nếu có).
        *   Tìm giá rao bán của các xe **${brand} ${model}** đời **${year}** đã qua sử dụng trên các trang uy tín tại Việt Nam. Tập trung vào những xe có số km gần với **${kms} km**. Ghi nhận một khoảng giá tham khảo.

    2.  **Xây dựng lập luận định giá:**
        *   **Xác định Giá Cơ Sở:** Dựa trên nghiên cứu, hãy xác định một mức "Giá Cơ Sở". Đây là giá trung bình của một chiếc xe tương tự trong điều kiện tiêu chuẩn (tình trạng khá, trung bình so với tuổi đời và số km) trên thị trường xe cũ.
        *   **Thực hiện điều chỉnh:** Dựa trên Giá Cơ Sở, hãy thực hiện các điều chỉnh tăng/giảm giá. **Quy tắc logic quan trọng:**
            *   Số km càng cao, giá càng giảm.
            *   Năm sản xuất càng cũ, giá càng giảm.
        *   **Tổng hợp:** Tính toán giá cuối cùng sau khi đã áp dụng các điều chỉnh.

    3.  **Định dạng đầu ra (BẮT BUỘC):** Chỉ trả về văn bản thuần túy theo cấu trúc bên dưới. KHÔNG sử dụng Markdown. Mỗi mục phải nằm trên một dòng riêng.

    GIÁ CƠ SỞ: [Giá trị tham khảo từ thị trường xe cũ]
    ĐIỀU CHỈNH KM (${kms} km): [Số tiền điều chỉnh, ví dụ: - 50 triệu VNĐ hoặc + 10 triệu VNĐ]
    ĐIỀU CHỈNH ĐỜI XE (${year}): [Số tiền điều chỉnh, ví dụ: - 20 triệu VNĐ]
    ---
    KHOẢNG GIÁ: [Điền khoảng giá trị hợp lý sau khi tính toán]
    GIÁ DỰ KIẾN: [Điền giá trị cuối cùng sau khi đã điều chỉnh]
    ---
    PHÂN TÍCH: [Viết một đoạn văn ngắn gọn giải thích quá trình trên. Giải thích tại sao bạn chọn Giá Cơ Sở đó và cơ sở cho các mức điều chỉnh. Luôn luôn giả định xe ở tình trạng trung bình ("Khá") phù hợp với năm sản xuất và số km.]
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.1, // Lower temperature for more deterministic results
      },
    });

    const text = response.text;
    
    // Use regex to parse the new structured text response
    const priceRangeMatch = text.match(/KHOẢNG GIÁ:\s*(.*)/);
    const estimatedPriceMatch = text.match(/GIÁ DỰ KIẾN:\s*(.*)/);
    const analysisMatch = text.match(/PHÂN TÍCH:\s*([\s\S]*)/);
    
    // New parsers for the breakdown
    const basePrice = text.match(/GIÁ CƠ SỞ:\s*(.*)/)?.[1]?.trim();
    const mileageAdjustment = text.match(/ĐIỀU CHỈNH KM.*:\s*(.*)/)?.[1]?.trim();
    const yearAdjustment = text.match(/ĐIỀU CHỈNH ĐỜI XE.*:\s*(.*)/)?.[1]?.trim();

    if (!priceRangeMatch || !analysisMatch || !estimatedPriceMatch || !basePrice) {
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
      basePrice,
      mileageAdjustment,
      yearAdjustment,
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