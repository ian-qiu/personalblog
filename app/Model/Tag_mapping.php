<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Tag_mapping extends Model
{
    protected $table = 't_tag_mapping_0';
    public $timestamps = false;
    protected $guarded = [];

    public static function replace($input)
    {
        $tag = self::firstOrNew([
            'article_id' => $input['article_id'],
            'tag_id' => $input['tag_id']
        ]);

        $tag->article_id = $input['article_id'];
        $tag->tag_id = $input['tag_id'];
        return $tag->save();
    }
}
