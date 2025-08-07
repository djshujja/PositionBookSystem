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

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class TradeEventControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper mapper;

    @Test
    void malformedJsonShouldReturn400() throws Exception {
        String badJson = "{ events: [ { action: BUY } "; // invalid
        mockMvc.perform(post("/api/trades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(badJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Malformed request"))
                .andExpect(jsonPath("$.error", containsString("Malformed JSON")));
    }

    @Test
    void missingRequiredFieldsShouldReturnErrors() throws Exception {
        String payload = """
            { "events": [
                { "action": "BUY", "security": "", "quantity": -5 }
              ]
            }
            """;
        mockMvc.perform(post("/api/trades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.errors['events[0].account']").value("Account is required"))
                .andExpect(jsonPath("$.errors['events[0].security']").value("Security is required"))
                .andExpect(jsonPath("$.errors['events[0].quantity']").value("Quantity must be zero or positive"));
    }

    @Test
    void cancelWithoutIdFieldShouldReturnError() throws Exception {
        String payload = """
            { "events": [
                { "action": "CANCEL", "account": "A1", "security": "S1", "quantity": 0 }
              ]
            }
            """;
        mockMvc.perform(post("/api/trades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(payload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Validation failed"))
                .andExpect(jsonPath("$.error", containsString("CANCEL event must provide an ID")));
    }
}
