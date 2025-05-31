<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DiagramListRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sku_code' => 'required|string|max:255',
            'dm_type' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'layer' => 'required|string|max:255',
            'fac_model' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'sku_code.required' => 'SKU Code is required.',
            'dm_type.required' => 'DM Type is required.',
            'url.required' => 'URL is required.',
            'layer.required' => 'layer is required.',
            'fac_model.required' => 'Fac Model is required.',
        ];
    }
}
