<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SparePartModel extends Model
{
    protected $connection = 'diagram';
    protected $table = 'data_file';
    
    protected $fillable = [
        'serial',
        'skusp',
        'skuspname',
        'skuspunit',
        'pathfile_sp',
        'namefile_sp',
        'skufg',
        'skufgname',
        'modelfg',
        'pathfile_dm',
        'namefile_dm',
        'typedm',
        'pathfile_manual',
        'namefile_manual',
        'createon',
        'price',
    ];
}
