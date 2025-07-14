module Api
  class EventsController < ApplicationController
    before_action :require_admin!, only: [:create, :update, :destroy]
    before_action :set_event, only: [:show, :update, :destroy]

    def index
      events = Event.all.order(date: :asc)
      render json: events
    end

    def show
      render json: @event
    end

    def create
      event = Event.new(event_params)
      if event.save
        render json: event, status: :created
      else
        render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def update
      if @event.update(event_params)
        render json: @event
      else
        render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def destroy
      @event.destroy
      head :no_content
    end

    private

    def set_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(
        :title, :description, :event_type, :level, :location, :paid, :amount, :image, :date,
        :registration_deadline, :start_time, :end_time, :capacity, :remaining_slots,
        :prerequisites, :what_to_bring, :schedule, :instructor_name, :instructor_bio,
        :fitness_level_details, :cancellation_policy, :venue_details, :additional_info,
        :age_restriction
      )
    end

    def require_admin!
      unless current_user&.role == "admin"
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  end
end
