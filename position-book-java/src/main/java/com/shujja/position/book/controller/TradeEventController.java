package com.shujja.position.book.controller;

import com.shujja.position.book.dto.TradeEventRequest;
import com.shujja.position.book.model.Position;
import com.shujja.position.book.service.PositionBookService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/trades")
@CrossOrigin(origins = "http://localhost:3000")
public class TradeEventController {

    private final PositionBookService service;

    public TradeEventController(PositionBookService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Map<String, List<Position>>> receiveEvents(
            @Valid @RequestBody TradeEventRequest request) {
        List<Position> positions = service.processEvents(request.getEvents());
        Map<String,List<Position>> resp = Map.of("Positions", positions);
        return ResponseEntity.ok(resp);
    }

    @GetMapping("/positions")
    public ResponseEntity<Map<String, List<Position>>> getPositions() {
        List<Position> positions = service.getAllPositions();
        Map<String, List<Position>> body = new HashMap<>();
        body.put("Positions", positions);
        return ResponseEntity.ok(body);
    }
}
