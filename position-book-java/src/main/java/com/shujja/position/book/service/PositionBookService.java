package com.shujja.position.book.service;

import com.shujja.position.book.model.Position;
import com.shujja.position.book.model.TradeEvent;
import com.shujja.position.book.store.InMemoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PositionBookService {
    private final InMemoryRepository repository;

    public PositionBookService(InMemoryRepository repository) {
        this.repository = repository;
    }

    public void processEvents(List<TradeEvent> events) {
        for (TradeEvent event : events) {
            switch (event.getAction()) {
                case BUY -> repository.addEvent(event, event.getQuantity());
                case SELL -> repository.addEvent(event, -event.getQuantity());
                case CANCEL -> repository.cancelEvent(event.getId());
            }
        }
    }

    public List<Position> getAllPositions() {
        return repository.getAllPositions();
    }

}
