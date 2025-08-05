package com.shujja.position.book.controller;

import com.shujja.position.book.dto.TradeEventRequest;
import com.shujja.position.book.model.Position;
import com.shujja.position.book.service.PositionBookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trades")
@CrossOrigin(origins = "http://localhost:3000")
public class TradeEventController {

    private final PositionBookService service;

    public TradeEventController(PositionBookService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void> receiveEvents(@RequestBody TradeEventRequest request) {
        service.processEvents(request.getEvents());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/positions")
    public ResponseEntity<List<Position>> getPositions() {
        return ResponseEntity.ok(service.getAllPositions());
    }

}
