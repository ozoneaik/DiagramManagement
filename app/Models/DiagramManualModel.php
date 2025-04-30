<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiagramManualModel extends Model
{
    protected $connection = 'diagram';
    protected $table = 'diagram_list_manual';

    protected $fillable = [
        'sku_code',
        'model_fg',
        'type_dm',
        'path_file'
    ];

}
