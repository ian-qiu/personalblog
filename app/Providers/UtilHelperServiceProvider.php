<?php

namespace App\Providers;

use App\Helpers\UtilHelper;
use Illuminate\Support\ServiceProvider;

class UtilHelperServiceProvider extends ServiceProvider
{
    public function boot(){}


    public function register()
    {
        $this->app->bind('UtilHelper', function(){
            return new UtilHelper();
        });
    }
}
