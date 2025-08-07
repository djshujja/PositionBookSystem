package com.shujja.position.book.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;  // only keep the ones you actually use
import java.util.UUID;

public class TradeEvent {

    /**
     * A random UUID we generate internally for every event record that act as unique identifier
     */
    @JsonProperty("uid")
    private String uid;

    /**
     * This is the Business ID that cancels against BUY/SELL.
     */
    private Integer id;

    @NotNull(message = "Action is required")
    private Action action;

    @NotBlank(message = "Account is required")
    private String account;

    @NotBlank(message = "Security is required")
    private String security;

    @PositiveOrZero(message = "Quantity must be zero or positive")
    private int quantity;

    public TradeEvent() {
    }

    public TradeEvent(Integer id,
                      Action action,
                      String account,
                      String security,
                      int quantity) {
        this.uid = UUID.randomUUID().toString();
        this.id = id;
        this.action = action;
        this.account = account;
        this.security = security;
        this.quantity = quantity;
    }

    public String getUid() {
        return uid;
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

    public void setUid(String uid) {
        this.uid = uid;
    }
}
