package com.shujja.position.book.store;

import com.shujja.position.book.model.Action;
import com.shujja.position.book.model.Position;
import com.shujja.position.book.model.TradeEvent;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Repository
public class InMemoryRepository {

    private final AtomicInteger eventIdCounter = new AtomicInteger(1);
    private final Map<String, Position> positions = new ConcurrentHashMap<>();
    private final Map<Integer, TradeEvent> eventMap = new ConcurrentHashMap<>();

    private String getKey(String account, String security) {
        return account + ":" + security;
    }

    /**
     * Handles BUY/SELL.
     */
    public void addEvent(TradeEvent event, int deltaQty) {
        if (event.getAction() != Action.CANCEL) {
            event.setId(eventIdCounter.getAndIncrement());
        }
        String key = getKey(event.getAccount(), event.getSecurity());
        positions.computeIfAbsent(key, k -> new Position(event.getAccount(), event.getSecurity()))
                .applyEvent(event, deltaQty);
        eventMap.put(event.getId(), event);
    }

    public void cancelEvent(int eventId) {
        TradeEvent original = eventMap.get(eventId);
        if (original != null && original.getAction() != Action.CANCEL) {
            String key = getKey(original.getAccount(), original.getSecurity());
            Position position = positions.get(key);
            if (position != null) {
                // reversing by applying negative of original quantity
                TradeEvent cancelEvent = new TradeEvent(
                        eventId, Action.CANCEL,
                        original.getAccount(),
                        original.getSecurity(),
                        0
                );
                position.applyEvent(cancelEvent, -original.getQuantity());
                eventMap.put(eventId, cancelEvent);
            }
        }
    }

    public List<Position> getAllPositions() {
        return new ArrayList<>(positions.values());
    }

    public boolean isAlreadyCanceled(int id) {
        return eventMap.values().stream()
                .anyMatch(e -> e.getAction() == Action.CANCEL && e.getId() == id);
    }

    public TradeEvent getEventById(int id) {
        return eventMap.get(id);
    }

    public Position getPositionByKey(String account, String security) {
        return positions.get(getKey(account, security));
    }
}
