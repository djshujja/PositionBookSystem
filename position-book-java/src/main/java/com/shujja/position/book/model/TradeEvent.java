package com.shujja.position.book.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public class TradeEvent {

    @NotNull(message = "ID is required for CANCEL", groups = CancelValidation.class)
    private Integer id;

    @NotNull(message = "Action is required")
    private Action action;

    @NotBlank(message = "Account is required")
    private String account;

    @NotBlank(message = "Security is required")
    private String security;

    @PositiveOrZero(message = "Quantity must be zero or positive")
    private int quantity;

    public TradeEvent() {}

    public TradeEvent(Integer id, Action action, String account, String security, int quantity) {
        this.id = id;
        this.action = action;
        this.account = account;
        this.security = security;
        this.quantity = quantity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public interface CancelValidation {}
}
