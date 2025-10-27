export interface FormData {
  brandAndModel: string;
  year: string;
  kms: string;
}

// FIX: Made `web` and its properties optional to align with the Gemini API's GroundingChunk type.
export interface GroundingSource {
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface ValuationResult {
  priceRange: string;
  estimatedPrice: string;
  analysis: string;
  sources: GroundingSource[];
}