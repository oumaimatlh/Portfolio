<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('professeurs', function (Blueprint $table) {
            $table->string('nom', 20)->nullable()->change();
            $table->string('prenom', 20)->nullable()->change();
            $table->string('email', 191)->nullable()->change();
            $table->string('telephone')->nullable()->change();

            $table->foreignId('id_administrateur')->nullable()->change();
            $table->foreignId('id_equipe')->nullable()->change();
            $table->foreignId('id_grade')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('professeurs', function (Blueprint $table) {
            $table->string('nom', 20)->nullable(false)->change();
            $table->string('prenom', 20)->nullable(false)->change();
            $table->string('email', 191)->nullable(false)->change();
            $table->string('telephone')->nullable(false)->change();

            $table->foreignId('id_administrateur')->nullable(false)->change();
            $table->foreignId('id_equipe')->nullable(false)->change();
            $table->foreignId('id_grade')->nullable(false)->change();
        });
    }
};
