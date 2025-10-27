import React, { useState, useCallback, useEffect } from 'react';
import { estimateCarPrice } from './services/geminiService';
import { FormData, ValuationResult } from './types';
import { InputField } from './components/InputField';
import { SelectField } from './components/SelectField';
import { CarIcon } from './components/CarIcon';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ValuationResultDisplay } from './components/ValuationResultDisplay';
import { CAR_BRANDS, CAR_MODELS_BY_BRAND } from './constants';

const App: React.FC = () => {
  const [formData, setFormData] = useState<Omit<FormData, 'condition'>>({
    brand: '',
    model: '',
    year: '',
    kms: '',
  });
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [isCustomModel, setIsCustomModel] = useState<boolean>(false);
  const [result, setResult] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (formData.brand && CAR_MODELS_BY_BRAND[formData.brand]) {
      setAvailableModels(CAR_MODELS_BY_BRAND[formData.brand]);
    } else {
      setAvailableModels([]);
    }
    // Reset model and custom model state when brand changes
    setFormData(prev => ({ ...prev, model: '' }));
    setIsCustomModel(false);
  }, [formData.brand]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleModelSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === 'Khác...') {
      setIsCustomModel(true);
      setFormData(prev => ({ ...prev, model: '' }));
    } else {
      setIsCustomModel(false);
      setFormData(prev => ({ ...prev, model: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.brand || !formData.model || !formData.year || !formData.kms) {
      setError('Vui lòng điền đầy đủ các trường thông tin bắt buộc: Hãng xe, Mẫu xe, Năm sản xuất và Số KM.');
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
    setIsCustomModel(false);
    setFormData({
      brand: '',
      model: '',
      year: '',
      kms: '',
    });
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
                  options={['Chọn hãng xe', ...CAR_BRANDS]}
                  required
                />
                <div>
                  <SelectField
                    label="Mẫu xe"
                    name="model-select"
                    value={isCustomModel ? 'Khác...' : formData.model}
                    onChange={handleModelSelectChange}
                    options={formData.brand ? ['Chọn mẫu xe', ...availableModels, 'Khác...'] : ['Vui lòng chọn hãng xe']}
                    disabled={!formData.brand || availableModels.length === 0}
                    required
                  />
                  {isCustomModel && (
                    <div className="mt-2">
                      <InputField
                        label="Tên mẫu xe (tùy chỉnh)"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        placeholder="VD: Corolla Cross 1.8V"
                        required
                      />
                    </div>
                  )}
                </div>
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