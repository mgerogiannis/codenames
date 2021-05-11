package com.game.whoami.controllers;

import com.game.whoami.model.ConnectionKey;
import com.game.whoami.model.KeyWord;
import com.game.whoami.model.WordCard;
import org.springframework.messaging.handler.annotation.MessageMapping;

import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.List;

@Controller
public class ExchangeController {


    @MessageMapping("/connectionkey")
    @SendTo("/topic/connectionkey")
    public ConnectionKey connectionKeyExchange(ConnectionKey message) throws Exception {
        Thread.sleep(1000); // simulated delay
        //return message;
        return new ConnectionKey(HtmlUtils.htmlEscape(message.getContent()));
    }

    @MessageMapping("/keyword")
    @SendTo("/topic/keyword")
    public KeyWord keyWordExchange(KeyWord message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new KeyWord(HtmlUtils.htmlEscape(message.getContent()));
    }

    @MessageMapping("/wordcards")
    @SendTo("/topic/wordcards")
    public List<WordCard> wordCardExchange(List<WordCard> message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return message;
    }


}
