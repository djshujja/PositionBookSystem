package com.shujja.position.book.dto;

import com.shujja.position.book.model.TradeEvent;

import java.util.List;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

public class TradeEventRequest {

    @NotEmpty
    @Valid
    private List<TradeEvent> events;

    public List<TradeEvent> getEvents() {
        return events;
    }

    public void setEvents(List<TradeEvent> events) {
        this.events = events;
    }
}
