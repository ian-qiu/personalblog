<?php
namespace App\Facades;
use Illuminate\Support\Facades\Facade;


class UtilHelperFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'UtilHelper';
    }
}