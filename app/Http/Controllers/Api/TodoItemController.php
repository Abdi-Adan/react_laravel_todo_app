<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TodoItemController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $todoItems = $user->todoItems;
        return response()->json($todoItems);
    }

    public function store(StoreTodoItemRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $todoItem = TodoItem::create([
            'title' => $data['title'],
            'completed' => $data['completed'],
            'user_id' => $user->id,
        ]);

        $response = response()->json($todoItem, 201);

        return response;
    }

    public function show($id)
    {
        $todoItem = TodoItem::findOrFail($id);

        return response()->json($todoItem);
    }

    public function update(Request $request, $id)
    {
        $todoItem = TodoItem::findOrFail($id);

        $todoItem->fill($request->all());
        $todoItem->save();

        return response()->json($todoItem);
    }

    public function destroy($id)
    {
        $todoItem = TodoItem::findOrFail($id);

        $todoItem->delete();

        return response()->json(null, 204);
    }
}
