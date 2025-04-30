<?php

namespace App\Http\Controllers;

use App\Models\DiagramManualModel;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DiagramManualController extends Controller
{
    public function index(): Response
    {
        try {
            $DiagramManuals = DiagramManualModel::query()->orderBy('id', 'desc')->paginate(100);
        } catch (\Exception $exception) {
            $DiagramManuals = [];
        }
        return Inertia::render('Diagrams/Manual/DmmMain', [
            'DiagramManuals' => $DiagramManuals
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Diagrams/Manual/DmmForm');
    }

    public function store(Request $request)
    {
        $request->validate([
            'sku_code' => ['required'],
            'type_dm' => ['required'],
            'model_fg' => ['required'],
            'path_file' => ['required'],
        ], [
            'sku_code.required' => 'sku_code is required',
            'type_dm.required' => 'type_dm is required',
            'model_fg.required' => 'model_fg is required',
            'path_file.required' => 'path_file is required',
        ]);

        try {
            DB::beginTransaction();
            $check = DiagramManualModel::query()
                ->where('sku_code',$request->sku_code)
                ->where('type_dm',$request->type_dm)
                ->where('model_fg',$request->model_fg)
                ->first();
            if($check){
                $createDiagramManual = DiagramManualModel::query()->update([
                    'sku_code' => $request->sku_code,
                    'type_dm' => $request->type_dm,
                    'model_fg' => $request->model_fg,
                    'path_file' => $request->path_file,
                    'created_at' => $check->created_at,
                    'updated_at' => Carbon::now()
                ]);
            }else{
                $createDiagramManual = DiagramManualModel::query()->create([
                    'sku_code' => $request->sku_code,
                    'type_dm' => $request->type_dm,
                    'model_fg' => $request->model_fg,
                    'path_file' => $request->path_file
                ]);
            }
            if ($createDiagramManual) {
                DB::commit();
                return redirect()->back()->with('success','บันทึกข้อมูลสำเร็จ');
            }else{
                throw new \Exception('ไม่สามารถบันทึกข้อมูลได้');
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function createCsv(): Response
    {
        return Inertia::render('Diagrams/Manual/DmmImportCSV');
    }
}
