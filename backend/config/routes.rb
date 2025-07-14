Rails.application.routes.draw do

  post '/webhooks/razorpay', to: 'webhooks#razorpay'
  namespace :api do 
    resources :events
    resources :payments, only: [:index] do
      collection do
        get :user, to: "payments#user_payments"
      end
    end
    post "/razorpay/webhook", to: "razorpay_webhook#create"
    post 'sign_in', to: 'sessions#login'          # Updated from create
    post 'sign_up', to: 'sessions#sign_up'
    delete 'destroy', to: 'sessions#destroy'
    post 'password', to: 'passwords#create'          # Forgot password
    put 'password', to: 'passwords#update'           # Reset password with token
    put 'password/change', to: 'passwords#change_password'    # Change password with old password
    post '/auth/google_signin', to: 'sessions#google_signin'
    get 'status', to: 'sessions#status'


    post 'razorpay/order', to: 'razorpay#order'  # Razorpay order creation
    post 'razorpay/verify', to: 'razorpay#verify'      # Razorpay payment verification

    post 'firebase_auth/verify', to: 'firebase_auth#verify'

    # post '/webhooks/razorpay', to: 'webhooks#razorpay'

  end
  
end 