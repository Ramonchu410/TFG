<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trade_requests', function (Blueprint $table) {
            $table->id();

            $table->foreignId('requester_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('target_service_id')->constrained('services')->cascadeOnDelete();
            $table->foreignId('offer_service_id')->nullable()->constrained('services')->nullOnDelete();

            $table->enum('status', ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'COMPLETED'])->default('PENDING');
            $table->text('message')->nullable();

            $table->timestamps();

            $table->unique(['requester_id', 'target_service_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trade_requests');
    }
};
