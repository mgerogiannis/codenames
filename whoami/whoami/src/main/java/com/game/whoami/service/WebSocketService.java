package com.game.whoami.service;

import com.game.whoami.model.ConnectionKey;
import com.game.whoami.model.KeyWord;
import com.game.whoami.model.WordCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WebSocketService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void connectionKeyNotification(final ConnectionKey message) {
        messagingTemplate.convertAndSend("/topic/connectionkey", message);
    }

    public void keyWordNotification(final KeyWord message) {
        messagingTemplate.convertAndSend("/topic/keyword", message);
    }

    public void wordCardNotification(final List<WordCard> message) {
        messagingTemplate.convertAndSend("/topic/wordcards", message);
    }
}
