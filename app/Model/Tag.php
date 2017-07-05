<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected  $table = 't_tag_0';
    public $timestamps = false;
    protected $guarded = [];
    protected $primaryKey = 'tag_id';

    public static function get_by_name($tag_name)
    {
        return self::select('tag_id')->where('tag_name', $tag_name)->get()->first();
    }

}
