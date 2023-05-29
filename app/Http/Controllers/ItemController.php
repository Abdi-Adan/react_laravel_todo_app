<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Carbon;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Item::orderBy('created_at', 'DESC')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newItem = new Item;
        $newItem->title = $request->item['title'];
        $newItem->save();

        return $newItem;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $existingItem = Item::find($id);
        if( $existingItem ){

            $existingItem->completed = $request->item['completed'] ? false: true;
            $existingItem->completed_at = $request->item['completed'] ? null : Carbon::now();

            $existingItem->save();

            return $existingItem;
        }

        return "Item not found";
    }

    public function edit(Request $request, $id)
    {
        $existingItem = Item::find($id);
        if( $existingItem ){
            $newTitle = $request->item['title'];
            $oldTitle = $existingItem->title;

            if($newTitle != $oldTitle){
                $existingItem->title = $newTitle;
            }


            $existingItem->save();

            return $existingItem;
        }

        return "Item not found";
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $existingItem = Item::find($id);

        if( $existingItem ){
            $existingItem->delete();

            return "Item successfully deleted!";
        }

        return "Item not found.";
        
    }
}
