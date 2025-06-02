<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiagramList extends Model
{
    protected $connection = 'diagram';
    protected $table = 'diagram_list';
    
    protected $fillable = [
        'sku_code',
        'dm_type',
        'path_file',
        'layer',
        'fac_model'
    ];

    public $timestamps = false;
}
