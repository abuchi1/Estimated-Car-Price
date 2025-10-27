import React, { useState, useCallback } from 'react';
import { estimateCarPrice } from './services/geminiService';
import { CAR_BRANDS, CAR_MODELS_BY_BRAND } from './constants';
import { FormData, ValuationResult } from './types';
import { SelectField } from './components/SelectField';
import { InputField } from './components/InputField';
import { CarIcon } from './components/CarIcon';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ValuationResultDisplay } from './components/ValuationResultDisplay';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    brand: CAR_BRANDS[0],
    model: CAR_MODELS_BY_BRAND[CAR_BRANDS[0]][0],
    year: '',
    kms: '',
  });
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'brand') {
      const newBrand = value;
      const newModels = CAR_MODELS_BY_BRAND[newBrand] || [];
      const newModel = newModels[0] || '';
      setFormData(prev => ({
        ...prev,
        brand: newBrand,
        model: newModel,
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.model || !formData.year || !formData.kms) {
      setError('Vui lòng điền đầy đủ tất cả các trường thông tin.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const valuation = await estimateCarPrice(formData);
      setResult(valuation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReevaluate = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return (
    <div className="bg-light min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-[1.01] duration-300">
        {!result ? (
          <>
            <header className="flex flex-col items-center mb-6 text-center">
              <CarIcon className="w-16 h-16 text-primary mb-3" />
              <h1 className="text-4xl font-bold text-dark">Trình Định Giá Xe AI</h1>
              <p className="text-gray-500 mt-2">Ước tính giá trị xe của bạn tại thị trường Việt Nam</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="Hãng xe"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  options={CAR_BRANDS}
                />
                <SelectField
                  label="Mẫu xe"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  options={CAR_MODELS_BY_BRAND[formData.brand] || []}
                />
                <InputField
                  label="Năm sản xuất"
                  name="year"
                  type="number"
                  min="1980"
                  max={new Date().getFullYear()}
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="VD: 2021"
                />
                <InputField
                  label="Số KM đã đi"
                  name="kms"
                  type="number"
                  min="0"
                  value={formData.kms}
                  onChange={handleInputChange}
                  placeholder="VD: 30000"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span className="ml-2">Đang định giá...</span>
                  </>
                ) : (
                  'Định Giá Xe'
                )}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-bold mb-2">Lỗi: Không thể hoàn tất định giá</p>
                <p className="text-sm whitespace-pre-wrap">{error}</p>
              </div>
            )}
          </>
        ) : (
          <ValuationResultDisplay result={result} formData={formData} onReevaluate={handleReevaluate} />
        )}
      </div>
    </div>
  );
};

export default App;