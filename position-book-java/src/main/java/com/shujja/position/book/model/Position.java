package com.shujja.position.book.model;

import java.util.ArrayList;
import java.util.List;

public class Position {

    private String account;
    private String security;
    private int quantity;
    private List<TradeEvent> events;

    public Position(String account, String security) {
        this.account = account;
        this.security = security;
        this.quantity = 0;
        this.events = new ArrayList<>();
    }
    public void applyEvent(TradeEvent event, int deltaQuantity) {
        this.quantity += deltaQuantity;
        this.events.add(event);
    }

    public String getAccount() {
        return account;
    }

    public String getSecurity() {
        return security;
    }

    public int getQuantity() {
        return quantity;
    }

    public List<TradeEvent> getEvents() {
        return events;
    }
}
