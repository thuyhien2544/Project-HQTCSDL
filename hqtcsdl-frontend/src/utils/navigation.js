import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

/**
 * Custom hook trả về các hàm điều hướng dùng chung trong app
 */
export function useAppNavigation() {
    const navigate = useNavigate();

    // Chuyển đến trang Recipes với optional search keyword
    const goToRecipePage = useCallback(
        (keyword = "") => {
            if (keyword && keyword.trim()) {
                navigate(`/recipes?search=${encodeURIComponent(keyword.trim())}`);
            } else {
                navigate("/recipes");
            }
        },
        [navigate]
    );

    // Chuyển về trang Home (Welcome)
    const goToHomePage = useCallback(() => {
        navigate("/");
    }, [navigate]);

    // Chuyển về trang Myrecipes
    const goToMyRecipesPage = useCallback(() => {
        navigate("/my-recipes");
    }, [navigate]);

    return {
        goToRecipePage,
        goToHomePage,
        goToMyRecipesPage,
    };
}
