package com.shujja.position.book.service;

import com.shujja.position.book.model.Action;
import com.shujja.position.book.model.Position;
import com.shujja.position.book.model.TradeEvent;
import com.shujja.position.book.store.InMemoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PositionBookServiceTest {

    private PositionBookService service;

    @BeforeEach
    void setUp() {
        service = new PositionBookService(new InMemoryRepository());
    }

    @Test
    void sellMoreThanHeldShouldThrow() {
        // buy 10 then attempt to sell 20
        service.processEvents(List.of(new TradeEvent(null, Action.BUY, "A1", "S1", 10)));
        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> service.processEvents(List.of(new TradeEvent(null, Action.SELL, "A1", "S1", 20)))
        );
        assertEquals("Insufficient quantity to SELL", ex.getMessage());
    }

    @Test
    void cancelUnknownIdShouldThrow() {
        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> service.processEvents(List.of(new TradeEvent(999, Action.CANCEL, "A1", "S1", 0)))
        );
        assertTrue(ex.getMessage().contains("No event found with ID"));
    }

    @Test
    void cancelTwiceShouldThrow() {
        TradeEvent buy = new TradeEvent(null, Action.BUY, "A1", "S1", 5);
        service.processEvents(List.of(buy));
        int assignedId = service.getAllPositions().get(0).getEvents().get(0).getId();

        // first cancel
        service.processEvents(List.of(new TradeEvent(assignedId, Action.CANCEL, "A1", "S1", 0)));

        // second cancel of same ID
        IllegalArgumentException ex = assertThrows(
                IllegalArgumentException.class,
                () -> service.processEvents(List.of(new TradeEvent(assignedId, Action.CANCEL, "A1", "S1", 0)))
        );
        assertEquals("Cannot CANCEL a CANCEL event", ex.getMessage());
    }
}
