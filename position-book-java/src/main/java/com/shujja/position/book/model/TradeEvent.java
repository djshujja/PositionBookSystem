package com.shujja.position.book.model;

import jakarta.validation.constraints.*;


public class TradeEvent {

    @NotNull
    private int id;

    @NotNull
    private Action action;

    @NotBlank
    private String account;

    @NotBlank
    private String security;

    @PositiveOrZero
    private int quantity;

    public TradeEvent() {}

    public TradeEvent(int id, Action action, String account, String security, int quantity) {
        this.id = id;
        this.action = action;
        this.account = account;
        this.security = security;
        this.quantity = quantity;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getSecurity() {
        return security;
    }

    public void setSecurity(String security) {
        this.security = security;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
