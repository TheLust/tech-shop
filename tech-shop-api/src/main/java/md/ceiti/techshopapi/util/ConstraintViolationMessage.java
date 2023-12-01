package md.ceiti.techshopapi.util;

public class ConstraintViolationMessage {

    public static final String NOT_NULL = "must not be null";
    public static final String NOT_EMPTY = "must not be empty";
    public static final String NOT_BLANK = "must not be blank";
    public static final String ALREADY_EXISTS = "already exists";
    public static final String NOT_FOUND = "not found";
    public static final String EMAIL = "must be valid";
    public static final String SIZE = "must have between {min} and {max} characters";
    public static final String PAST = "must be in the past";
    public static final String OVER18 = "must be 18+";
    public static final String INTERNATIONAL_FORMAT = "must be in the international format";
    public static final String CONTAIN_ONLY_LETTERS_NUMBERS_PERIODS = "must contain only letters (a-z), numbers (0-9), and periods (.)";
    public static final String CANNOT_BEGIN_OR_END_WITH_PERIODS = "must not begin or end with periods (.)";
    public static final String LEAST_CAPITAL_LETTER_NUMBER_SYMBOL = "must have at least a capital letter(A-Z), number(0-9) and symbol";
    public static final String NOT_MATCH = "does not match";
}
