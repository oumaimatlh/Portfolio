<?php

// ==========================
// CONTROLLER : ProfesseurController.php
// ==========================

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class ProfesseurController extends Controller
{
    public function index()
    {
        return response()->json(Professeur::with(['administrateur', 'equipe', 'grade'])->get(), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'string|max:20',
            'prenom' => 'string|max:20',
            'email' => 'email|email',
            'telephone' => 'string',
            'code_authentification' => 'string|size:5|unique:professeurs,code_authentification',
            'mot_de_passe' => 'string',
            'scopus' => 'nullable|string',
            'orcid' => 'nullable|string',
            'scholar' => 'nullable|string',
            'photo' => 'nullable',
            'id_equipe' => 'exists:equipes,id',
            'id_grade' => 'exists:grades,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();
        $data['mot_de_passe'] = bcrypt($data['mot_de_passe']);

        $professeur = Professeur::create($data);

        return response()->json($professeur, 201);
    }

    public function show(string $id)
    {
        $professeur = Professeur::with(['administrateur', 'equipe', 'grade'])->find($id);

        if (!$professeur) {
            return response()->json(['message' => 'Professeur non trouvé'], 404);
        }

        return response()->json($professeur);
    }

    public function update(Request $request, string $id)
    {
        $professeur = Professeur::find($id);

        if (!$professeur) {
            return response()->json(['message' => 'Professeur non trouvé'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nom' => 'sometimes|string|max:20',
            'prenom' => 'sometimes|string|max:20',
            'email' => 'sometimes|email|unique:professeurs,email,' . $id,
            'telephone' => 'sometimes|string',
            'code_authentification' => 'sometimes|string|size:5|unique:professeurs,code_authentification,' . $id,
            'mot_de_passe' => 'sometimes|string',
            'scopus' => 'nullable|string',
            'orcid' => 'nullable|string',
            'scholar' => 'nullable|string',
            'photo' => 'nullable',
            'id_equipe' => 'sometimes|exists:equipes,id',
            'id_grade' => 'sometimes|exists:grades,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $request->all();
        if (isset($data['mot_de_passe'])) {
            $data['mot_de_passe'] = bcrypt($data['mot_de_passe']);
        }

        $professeur->update($data);

        return response()->json($professeur);
    }

    public function destroy(string $id)
    {
        $professeur = Professeur::find($id);

        if (!$professeur) {
            return response()->json(['message' => 'Professeur non trouvé'], 404);
        }

        $professeur->delete();

        return response()->json(['message' => 'Professeur supprimé avec succès']);
    }

    public function updatePortfolio(Request $request)
{
    

    // ✅ Utiliser le bon guard
    $professeur = Auth::guard('professeur')->user();
    \Log::info('📥 Données reçues Laravel', ['data' => $request->all()]);
    \Log::info('✅ Professeur connecté', ['id' => optional($professeur)->id]);
    if (!$professeur) {
        return response()->json(['message' => 'Non authentifié'], 401);
    }

    $validated = $request->validate([
        'nom' => 'required|string',
        'prenom' => 'required|string',
        'email' => 'required|email',
        'telephone' => 'required|string',
        'photo' => 'nullable|image|mimes:jpeg,jpg,png,gif|max:2048',
        'scopus' => 'nullable|string',
        'orcid' => 'nullable|string',
        'scholar' => 'nullable|string',
        'id_grade' => 'required|exists:grades,id',
        'id_equipe' => 'required|exists:equipes,id',
    ]);

    $professeur->fill($validated);

    if ($request->hasFile('photo')) {
        \Log::info('📸 Fichier photo détecté');
        
        $path = $request->file('photo')->store('professeurs/photos', 'public');
        $professeur->photo = $path;
    }

    $professeur->is_completed = true;
    $professeur->save();

    return response()->json(['message' => 'Profil mis à jour avec succès']);
}

    
}
