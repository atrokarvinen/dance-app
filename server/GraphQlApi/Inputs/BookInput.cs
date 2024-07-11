namespace GraphQlApi.Inputs;

public record BookInput([property: ID] int? Id, string Title, int AuthorId);
