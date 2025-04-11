<?php

namespace App\Providers;

use App\Models\Task;
use App\Policies\TaskPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
// use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Task::class => TaskPolicy::class,
        
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //  définitiom des Gates supplémentaires
      
        
        // Gate::define('view-task', function ($user, $task) {
        //     return $user->id === $task->user_id;
        // });
        // Gate::define('update-task', function ($user, $task) {
        //     return $user->id === $task->user_id;
        // });
    
        // Gate::define('delete-task', function ($user, $task) {
        //     return $user->id === $task->user_id;
        // });
        // Gate::define('complete', function ($user, $task) {
        //     return $user->id === $task->user_id;
        // });

        
    }
}