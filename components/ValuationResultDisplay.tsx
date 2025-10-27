
import React from 'react';
import { ValuationResult, FormData } from '../types';

interface ValuationResultDisplayProps {
  result: ValuationResult;
  formData: FormData;
  onReevaluate: () => void;
}

export const ValuationResultDisplay: React.FC<ValuationResultDisplayProps> = ({ result, formData, onReevaluate }) => {
  // FIX: Filter for sources that have a valid web URI before rendering to avoid runtime errors with optional properties.
  const validSources = result.sources?.filter(s => s.web?.uri);

  return (
    <div className="mt-2 animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-dark mb-6">Kết Quả Định Giá</h2>

      {/* Input Info Summary */}
      <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin xe đã nhập:</h3>
        <div className="grid grid-cols-[max-content,1fr] gap-x-8 gap-y-3 items-center">
          <span className="text-gray-600">Hãng xe:</span>
          <span className="font-bold text-dark text-right uppercase">{formData.brand}</span>

          <span className="text-gray-600">Hiệu xe:</span>
          <span className="font-bold text-dark text-right uppercase">{formData.model}</span>

          <span className="text-gray-600">Năm sản xuất:</span>
          <span className="font-bold text-dark text-right">{formData.year}</span>

          <span className="text-gray-600">Số km:</span>
          <span className="font-bold text-dark text-right">{Number(formData.kms).toLocaleString('vi-VN')} km</span>
        </div>
      </div>

      {/* Estimated Price */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-2xl shadow-lg text-center mb-8">
        <p className="text-xl opacity-90">Giá trị ước tính</p>
        <h3 className="text-5xl font-extrabold my-2 tracking-tight">{result.estimatedPrice}</h3>
        <p className="text-lg opacity-80 mt-1">Trong khoảng: {result.priceRange}</p>
      </div>

      {/* Analysis */}
      {result.analysis && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-dark mb-3">Phân tích chi tiết</h3>
          <div className="text-gray-700 whitespace-pre-wrap bg-white p-4 rounded-lg border leading-relaxed">{result.analysis}</div>
        </div>
      )}

      {/* Sources */}
      {validSources && validSources.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-dark mb-3">Nguồn tham khảo</h3>
          <ul className="list-disc list-inside space-y-2 bg-white p-4 rounded-lg border">
            {validSources.map((source, index) => (
              <li key={index} className="text-gray-700">
                <a
                  href={source.web!.uri!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary underline transition-colors"
                >
                  {source.web!.title || source.web!.uri}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Re-evaluate Button */}
      <div className="mt-8 text-center">
        <button
          onClick={onReevaluate}
          className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
        >
          Định Giá Lại Xe Khác
        </button>
      </div>
    </div>
  );
};