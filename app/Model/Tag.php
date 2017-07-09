<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    public static function get_tags_by_article_id($article_id)
    {
        $tag_list = DB::table('t_tag_mapping_0 as m')->select('*')->leftJoin('t_tag_0 as t', 'm.tag_id', '=', 't.tag_id')
            ->where('m.article_id', $article_id)
            ->get();
        return $tag_list;
    }
}
