<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Article extends Model
{
    protected $table = 't_article_0';
    public $timestamps = false;
    protected $guarded = [];
    protected $primaryKey = 'article_id';

    public static function get_article_by_id($article_id)
    {
        $article = DB::table('t_article_0 as a')->leftJoin('t_tag_mapping_0 as m', 'm.article_id', '=', 'a.article_id')
            ->rigitJoin('t_tag_0 t', 't.tag_id', '=', 'm.tag_id')
            ->where('a.article_id', $article_id)
            ->get();
//        return empty($article) ? $article : $article->toArray();
        if (!empty($article)) {
            $tag_ids = array_column($article[0]->toArray(), 'id');dd($tag_ids);
            $a = Tag::select('tag_name')->wherein('tag_id', $tag_ids)->get();
            dd($a->toArray);
        }
        return $article;
    }
}
