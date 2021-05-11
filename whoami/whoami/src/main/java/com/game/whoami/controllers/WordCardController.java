package com.game.whoami.controllers;

import com.game.whoami.model.WordCard;
import com.game.whoami.service.WordCardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Random;


@RestController
@RequestMapping("/wordcard")
public class WordCardController {
    private final WordCardService wordCardService;

    public WordCardController(WordCardService wordCardService) {
        this.wordCardService = wordCardService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<WordCard>> getAllWordCards(){
        List<WordCard> wordCardList = wordCardService.findAllWordCards();
        int length = wordCardList.size();
        Random r = new Random();
        for (int i = length - 1; i >= length - 25; --i)
        {
            Collections.swap(wordCardList, i , r.nextInt(i + 1));
        }
        return new ResponseEntity<>(wordCardList.subList(length - 25, length), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<WordCard> addWordCard(@RequestBody WordCard wordCard){
        WordCard newWordCard = wordCardService.addWordCard(wordCard);
        return new ResponseEntity<>(newWordCard, HttpStatus.CREATED);
    }
}
