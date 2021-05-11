package com.game.whoami.service;

import com.game.whoami.model.CardCategory;
import com.game.whoami.repo.CardCategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardCategoryService {
    private final CardCategoryRepo cardCategoryRepo;

    @Autowired
    public CardCategoryService(CardCategoryRepo cardCategoryRepo) {
        this.cardCategoryRepo = cardCategoryRepo;
    }

    public CardCategory addCardCategory(CardCategory cardCategory){
        return cardCategoryRepo.save(cardCategory);
    }

    public List<CardCategory> findAllCardCategories(){
        return cardCategoryRepo.findAll();
    }
}
