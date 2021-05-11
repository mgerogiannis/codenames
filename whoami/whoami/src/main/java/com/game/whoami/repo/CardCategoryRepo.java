package com.game.whoami.repo;

import com.game.whoami.model.CardCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardCategoryRepo extends JpaRepository<CardCategory, Integer> {
}
