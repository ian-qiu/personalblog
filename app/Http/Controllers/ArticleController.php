<?php

namespace App\Http\Controllers;

use App\Facades\UtilHelperFacade;
use App\Model\Article;
use App\Model\Tag;
use App\Model\Tag_mapping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use League\Flysystem\Exception;

class ArticleController extends Controller
{
    /*
     * 列表
     */
    public function get_article_list()
    {
        $article_list = Article::get();
        $article_list = empty($article_list) ? [] : $article_list->toArray();
        UtilHelperFacade::build_return($article_list);
    }
    /*
     * 新增
     */
    public function add_article(Request $request)
    {
        $input = $request->input();
        UtilHelperFacade::requires_input(array(
            'title', 'content',
            ),$input
        );

        $tags = isset($input['tags']) ? array_filter($input['tags']) : [];

        $new_article = [
            'title' => $input['title'],
            'content' => $input['content'],
            'ctime' => time(),
        ];

        if (!empty($tags)) {
           $article_id = DB::transaction(function() use ($new_article, $tags) {
                $article_id = DB::table('t_article_0')->insertGetId($new_article);
                 array_map(function($x) use ($article_id) {
                     $input = [
                        'tag_id' => $x['id'],
                        'article_id' => $article_id
                     ];
                     $res = Tag_mapping::replace($input);
                     if (empty($res)) {
                         throw new Exception('插入失败');
                     }
                }, $tags);
                return $article_id;
            });
        } else {
            $article_info = Article::create($new_article);
            UtilHelperFacade::build_return($article_info);
            $article_id = $article_info->article_id;
        }
        UtilHelperFacade::build_return($article_id);
    }

    /*
     * 编辑tag
     */
    public function new_tag(Request $request)
    {
        $input = $request->input();
        UtilHelperFacade::requires_input(array(
            'tag',
        ),$input);

        $tag = trim($input['tag']);
        if (empty($tag)) {
            UtilHelperFacade::build_return();
        }

        $tag_info = Tag::get_by_name($tag);
        if (empty($tag_info)) {
            $insert = [
                'tag_name' => $tag,
                'ctime' => time()
            ];
            $tag_obj = Tag::create($insert);
            $tag_id = $tag_obj->tag_id;
        } else {
            $tag_id = $tag_info->tag_id;
        }
        UtilHelperFacade::build_return($tag_id);
    }

    /*
     * 详情
     */
    public function get_article_by_id(Request $request)
    {
        $input = $request->input();
        UtilHelperFacade::requires_input(array(
            'article_id',
        ),$input);

        $article = Article::get_article_by_id($input['article_id']);

        //tags
        $tags = Tag::get_tags_by_article_id($input['article_id']);

        $article['tags'] = $tags;

        UtilHelperFacade::build_return($article);
    }
}
