package com.shujja.position.book.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shujja.position.book.dto.TradeEventRequest;
import com.shujja.position.book.model.Action;
import com.shujja.position.book.model.TradeEvent;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TradeEventControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void postTradeEventsAndGetPositions() throws Exception {
        TradeEventRequest request = new TradeEventRequest();
        request.setEvents(List.of(
                new TradeEvent(null, Action.BUY, "ACC1", "SEC1", 100),
                new TradeEvent(null, Action.SELL, "ACC1", "SEC1", 30)
        ));

        mockMvc.perform(post("/api/trades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.Positions", hasSize(1)))
                .andExpect(jsonPath("$.Positions[0].account", is("ACC1")))
                .andExpect(jsonPath("$.Positions[0].security", is("SEC1")))
                .andExpect(jsonPath("$.Positions[0].quantity", is(70)))
                .andExpect(jsonPath("$.Positions[0].events", hasSize(2)));
    }

    @Test
    void testValidationFailsOnInvalidData() throws Exception {
        String invalidRequest = """
        {
          "events": [
            { "id": null, "action": "BUY", "account": "", "security": "", "quantity": -10 }
          ]
        }
        """;

        mockMvc.perform(post("/api/trades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidRequest))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.errors['events[0].account']").value("Account is required"))
                .andExpect(jsonPath("$.errors['events[0].security']").value("Security is required"))
                .andExpect(jsonPath("$.errors['events[0].quantity']").value("Quantity must be zero or positive"));
    }
}
