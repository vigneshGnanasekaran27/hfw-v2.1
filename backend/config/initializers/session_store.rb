Rails.application.config.session_store :cookie_store,
  key: '_hfw_session',
  same_site: :none,
  secure: true
