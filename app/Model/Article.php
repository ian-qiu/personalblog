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
        $article = self::where('article_id', $article_id)
            ->where('status', 0)
            ->get()->first()->toArray();
        return $article;
    }
}
