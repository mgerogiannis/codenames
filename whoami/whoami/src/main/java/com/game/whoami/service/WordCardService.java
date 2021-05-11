package com.game.whoami.service;

import com.game.whoami.model.WordCard;
import com.game.whoami.repo.WordCardRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordCardService {
    private final WordCardRepo wordCardRepo;

    @Autowired
    public WordCardService(WordCardRepo wordCardRepo) {
        this.wordCardRepo = wordCardRepo;
    }

    public WordCard addWordCard(WordCard wordCard){
        return wordCardRepo.save(wordCard);
    }

    public List<WordCard> findAllWordCards(){
        return wordCardRepo.findAll();
    }

}
