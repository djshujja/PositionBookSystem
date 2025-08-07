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
    void testBuyAndSellUpdatesQuantity() {
        TradeEvent buy = new TradeEvent(null, Action.BUY, "ACC1", "SEC1", 100);
        TradeEvent sell = new TradeEvent(null, Action.SELL, "ACC1", "SEC1", 30);

        service.processEvents(List.of(buy, sell));
        List<Position> positions = service.getAllPositions();

        assertEquals(1, positions.size());
        Position position = positions.get(0);
        assertEquals("ACC1", position.getAccount());
        assertEquals("SEC1", position.getSecurity());
        assertEquals(70, position.getQuantity());
        assertEquals(2, position.getEvents().size());
    }

    @Test
    void testCancelReversesEvent() {
        TradeEvent buy = new TradeEvent(null, Action.BUY, "ACC1", "SEC1", 50);
        service.processEvents(List.of(buy));

        // Capture the generated ID from the stored event
        int generatedId = service.getAllPositions()
                .get(0)
                .getEvents()
                .get(0)
                .getId();

        // Now cancel that event
        TradeEvent cancel = new TradeEvent(generatedId, Action.CANCEL, "ACC1", "SEC1", 0);
        service.processEvents(List.of(cancel));

        Position position = service.getAllPositions().get(0);
        assertEquals(0, position.getQuantity());
        assertEquals(2, position.getEvents().size());
    }
}
