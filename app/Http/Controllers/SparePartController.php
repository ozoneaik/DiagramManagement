<?php

namespace App\Http\Controllers;

use App\Models\SparePartModel;
use Inertia\Inertia;

class SparePartController extends Controller
{
    public function index(){
        $sparePartList = SparePartModel::query()
            ->orderBy('serial', 'asc')
            ->paginate(100);
        return Inertia::render('Spareparts/SpMain',[
            'sparePartList' => $sparePartList,
        ]);
    }
}
