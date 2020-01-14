package model;

public class Sala {
	
	private int id;
	private String naziv;
	private int brojSedista;
	private String tipoviProjekcija;
	
	
	public Sala(int id, String naziv,int brojSedista, String tipoviProjekcija) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.brojSedista = brojSedista;
		this.tipoviProjekcija = tipoviProjekcija;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getNaziv() {
		return naziv;
	}


	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public int getBrojSedista() {
		return brojSedista;
	}


	public void setBrojSedista(int brojSedista) {
		this.brojSedista = brojSedista;
	}
	
	public String getTipoviProjekcija() {
		return tipoviProjekcija;
	}


	public void setTipoviProjekcija(String tipoviProjekcija) {
		this.tipoviProjekcija = tipoviProjekcija;
	}
	
	

}
