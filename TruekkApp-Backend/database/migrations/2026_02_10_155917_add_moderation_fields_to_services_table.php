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
    Schema::table('services', function (Blueprint $table) {
        $table->enum('moderation_status', ['PENDING', 'APPROVED', 'REJECTED'])->default('PENDING');
        $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
        $table->timestamp('reviewed_at')->nullable();
        $table->text('rejection_reason')->nullable();
    });
}

public function down(): void
{
    Schema::table('services', function (Blueprint $table) {
        $table->dropConstrainedForeignId('reviewed_by'); // o dropForeign + dropColumn si da guerra
        $table->dropColumn(['moderation_status', 'reviewed_at', 'rejection_reason']);
    });
}

};
