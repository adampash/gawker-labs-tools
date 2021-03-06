Rails.application.routes.draw do

  post 'slackbot' => 'slackbot#handle'

  devise_for :users, :controllers => { :omniauth_callbacks => "omniauth_callbacks" }

  get 'logout' => 'users#logout', as: :user_logout

  namespace :api do
    resources :embeds
    resources :pictures
    resources :galleries
    resources :styles
    resources :sites do
      resources :goals
    end
    post 'users/autocomplete' => 'users#autocomplete'
    get 'users/:id/prev_quarter/:quarter_id' => 'users#prev_quarter'
    get 'users/:id/goals/:quarter_id/check' => 'users#check_for_goal'
    post 'titles/autocomplete' => 'titles#autocomplete'
    get 'sites/:site_name/quarters/:quarter_id' => 'goals#show_quarter'
    get 'goals/:id' => 'goals#show'
    post 'goals/:id/approve' => 'goals#approve'
    post 'goals/:id/reject' => 'goals#reject'
    get 'sites' => 'sites#index'
  end

  namespace :iframe do
  #   resources :embeds
  #   resources :galleries
    get 'embeds/:id' => 'embeds#embed'
    get '(*iframe)' => 'embeds#empty'
  end

  get 'switch_user' => 'switch_user#set_current_user'
  get 'switch' => 'users#switch'

  # direct all non-caught pages somewhere
  get '(*foo)' => 'pages#hello'
  root 'pages#hello'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
