package com.game.whoami.controllers;

import com.game.whoami.model.ConnectionKey;
import com.game.whoami.model.KeyWord;
import com.game.whoami.model.WordCard;
import com.game.whoami.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/websocket")
public class WebSocketController {

    @Autowired
    private WebSocketService service;

    @PostMapping("/connectionkey")
    public void sendConnectionKey(@RequestBody final ConnectionKey message) { service.connectionKeyNotification(message); }

    @PostMapping("/keyword")
    public void sendKeyWord(@RequestBody final KeyWord message) {
        service.keyWordNotification(message);
    }

    @PostMapping("/wordcard")
    public void sendWordCard(@RequestBody final List<WordCard> message) {
        service.wordCardNotification(message);
    }

}
